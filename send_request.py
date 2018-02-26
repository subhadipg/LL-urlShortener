import requests
import time

api_endpoint = "http://localhost:4000/api/shorten/"

url_to_shorten = "www.blahblahblah.com"

time_interval = 10 # 10s

while True:
    print("Sending post request to " + api_endpoint + "with url: " + url_to_shorten)
    r = requests.post(api_endpoint, data = {'url':url_to_shorten})
    print(r.status_code, r.reason)
    time.sleep(time_interval)
