import json
import os
import sys
from urllib.parse import urlparse
from seleniumwire import webdriver  # Import from seleniumwire
from selenium.webdriver.chrome.options import Options

def set_driver_cookies(driver):
    driver.add_cookie({ 'name': 'userPostcode', 'value': '211677092' })
    driver.add_cookie({ 'name': 'userVisited', 'value': 'true' })
    driver.add_cookie({ 'name': 'authId', 'value': '211677092' })
    driver.add_cookie({ 'name': '_hjSessionUser_513908', 'value': 'eyJpZCI6IjZlODkyYmMwLWM3YjYtNTU3NS04Y2E1LTlhMmY0OGMzM2FlNyIsImNyZWF0ZWQiOjE2NDk5NDk0NTUzNzIsImV4aXN0aW5nIjp0cnVlfQ==' })
    driver.add_cookie({ 'name': '_hjSession_513908', 'value': 'eyJpZCI6IjMxNjQ3YWRkLTc4YmQtNGZjNS1iNzczLTA2YTMwYTJmZWJmOCIsImNyZWF0ZWQiOjE2NTAzMjUzMTA1NDcsImluU2FtcGxlIjp0cnVlfQ==' })
    driver.add_cookie({ 'name': 'AISSessionId', 'value': '6215fc34b2216aef_4718009_ytlLzant_OTEuMTkzLjI0Ni4xNzM!_0000000nUuo' })
    driver.add_cookie({ 'name': '_hjIncludedInSessionSample', 'value': '1' })
    return
    cookiefile = open('cooks.json')
    cookies = json.loads(open('cooks.json').read())['cookies']
    for cookie in cookies:
        try:
            driver.add_cookie(cookie)
            print(f"added {cookie}")
        except Exception as e:
            print(f"Cookie addition error while adding {cookie} error is: {str(e)}")

    # for cookiedict in cook

# Create a new instance of the Chrome driver
driver_options = Options()
driver_options.add_argument("--autoplay-policy=no-user-gesture-required")

driver = webdriver.Chrome(executable_path="/Users/safakge/Developer/seleniumwire-test/chromedriver", chrome_options=driver_options)


# driver.add_cookie({ 'name': 'userPostcode', 'value': '211677092', 'domain': '.planetradio.co.uk'})

# default_url = 'https://www.radio.net/s/kisstory'
# default_url = 'https://planetradio.co.uk/kisstory/player/'
default_url = 'https://planetradio.co.uk/absolute-radio/player/'
default_url = 'http://ukrp.planetradio.co.uk/?station=kisstory'

target_url = sys.argv[1] if len(sys.argv) > 1 else default_url # THE URL

urlparsed = urlparse(target_url)
root_url = f'{urlparsed.scheme}://{urlparsed.hostname}'
print(f"Began work for {target_url}... (root is: {root_url})")

# add cookies
driver.get(root_url) # we visit the basic url first, in order to set cookies before the next request

set_driver_cookies(driver)

driver.get(target_url)


filedir = os.path.dirname(os.path.realpath(__file__))
with open(f'{filedir}/jquery360.js', 'r') as jquery_js: 
    # 3) Read the jquery from a file
    jquery = jquery_js.read() 

    # 4) Load jquery lib
    driver.execute_script(jquery)
    # 5) Execute your command 
    # aa = driver.execute_script('$("#myId").click()')
    # driver.implicitly_wait(355)

    # ab = driver.execute_script(f"ab = $('div.player__button.player__button--stopped');")

    ### Radio.net clicker
    # driver.execute_script("""
    #     document.addEventListener('DOMContentLoaded', function() {
    #     ab = $('div.player__button.player__button--stopped');
    #     ab.click()
    # }, false);
    # """)

    ### planetradio.co.uk clicker
    clicker = """
    alert('seksue');
    $('#audiojs_wrapper0 > div.button.main.play-pause > span.play').click();
    """

    # driver.execute_script(f"""document.addEventListener('DOMContentLoaded', function() {{
    #     {clicker} 
    # }}, false);
    # """)

    # driver.execute_script(f"document.addEventListener('DOMContentLoaded', function() {{ alert('yeah'); }}, false)")
    driver.execute_script(f"document.addEventListener('load', function() {{ alert('loadevent'); }}, false)")
    # driver.execute_script("src = document.getElementsByTagName('audio')[0].src; alert('YEA ' + src)")

    # driver.execute_script(f"audio_element = $('audio'); alert('thisworks ' + audio_element.src);")

    # driver.execute_script("alert('sekfk');")
    # driver.execute_script(clicker)

    # the_req = driver.wait_for_request('\.aac', 10)

# Access requests via the `requests` attribute
for request in driver.requests:
    if request.response:
        print(
            "---> ",
            request.url,
            request.response.status_code,
            request.response.headers['Content-Type']
        )

def wait_for_req(driver):
    the_req = driver.wait_for_request('\.aac', 10)
    print(f'FOUNDIT! --> {the_req}')
    print(the_req.response.headers)
    exit()