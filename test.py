import urllib.request
import re
try:
    req = urllib.request.Request('https://in.linkedin.com/in/amireality', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'<meta property=\"og:image\" content=\"([^\"]+)\"', html)
    if match:
        print(match.group(1))
    else:
        print('No og:image found')
except Exception as e:
    print('Error:', e)
