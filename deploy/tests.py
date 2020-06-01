#!/usr/bin/env python3

import os, re, json, glob, sys
import requests as rq

# for this purpose we just want to ensure that the tests run, not whether the tile was correctly classified

def parse_chunk(chunk):
    
    ll = [e for e in chunk if len(e)]
    # find the header info:
    hdr = [e for e in ll if e.startswith('POST') or e.startswith('GET')]
    if not hdr:
        return None
    method, URI = hdr[0].split(' ')[:2]
    try:
        openbrk, closbrk = ll.index('{'), ll.index('}')
        jsonblob = ''.join(ll[openbrk:closbrk+1])
        req_body = json.loads(jsonblob)
    except Exception as e:
        print(str(e))
        req_body = None
    return {'method': method,'URI': URI,'body': req_body}


def parse_http_test(httpfile):
    with open(f'../test/{httpfile}','r') as fh:
        lines = [e.strip() for e in fh.readlines()]
    seps = [i for i,j in enumerate(lines) if j.startswith('###')]
    cbegin = [i+1 for i in seps]
    cends = [i-1 for i in seps][1:] + [len(lines)]
    chunks = [lines[a:b] for a,b in zip(cbegin,cends)]
    rv = [parse_chunk(e) for e in chunks]
    rv = [e for e in rv if e is not None]
    if len(rv) < len(chunks):
        print(f'{httpfile}: failed parsing {len(chunks)-len(rv)} chunks.')
    return rv


def test_endpoint(test,unmask = None):
    """
    Send the given HTTP requests to the endpoint and collect status codes
    For masked tests, insert the value of 'unmask' to replace the 'xxxxxxx'
    """
    def unmask_endpoint(url,x):
        return re.sub(r'(https?://)\w+\.',f'\\1{x}.',url)
    reqURL = test['URI']
    if unmask:
        reqURL = unmask_endpoint(reqURL,unmask)
    try:
        test_req = rq.request(
            method = test['method'],
            url = reqURL,
            json = test['body']
        )
    except Exception as e:
        print(f'Testing {reqURL} failed!')
        return (0,str(e),'')
    sc = test_req.status_code
    print(f'Testing {reqURL} {"passed" if sc==200 else "failed"}.')
    return (
        sc,
        test_req.reason,
        test_req.content.decode() if sc == 200 else ''
    )    

def run_all_tests(unmask):
    http_files = glob.glob('../test/*.http')
    all_tests = {}
    for e in http_files:
        test_name = e.rsplit('/',1)[1].split('.')[0].replace('test_','')
        all_tests[test_name] = parse_http_test(e)

    results = {}
    for test in all_tests.keys():
        print(f"\n\nTesting {test} endpoint...")
        results[test] = [test_endpoint(req,unmask) for req in all_tests[test]]
    return results

if __name__ == '__main__':
    # (optional) arg is the unmasking part of the URL
    argv = sys.argv
    unmask = None
    if len(argv) > 1:
        unmask = argv[1]
        print(f"Using invoke URL '{unmask}''")
    run_all_tests(unmask)
    


