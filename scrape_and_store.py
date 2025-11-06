from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from pymongo import MongoClient
import time
import re

# -----------------------------
# MongoDB setup
# -----------------------------
client = MongoClient("mongodb+srv://<username>:<password>@cluster0.emwcxuy.mongodb.net/?retryWrites=true&w=majority")
db = client["constitutional_learning"]
lessons_collection = db["lessons"]

# -----------------------------
# Selenium setup
# -----------------------------
options = webdriver.ChromeOptions()
options.add_argument("--headless")
driver = webdriver.Chrome(service=Service("C:/Users/carol/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe"), options=options)

LIST_URL = "https://legislative.gov.in/constitution-amendment-act-1-to-106/"

driver.get(LIST_URL)
time.sleep(3)  # wait for JS to load

soup = BeautifulSoup(driver.page_source, "html.parser")
container = soup.find("div", class_="view-content")
if not container:
    print("❌ Cannot find listing container on the page even with Selenium")
else:
    rows = container.find_all("div", class_="views-row")
    print(f"Found {len(rows)} amendment acts")
    for row in rows[:5]:  # test first 5
        link_tag = row.find("a")
        if link_tag:
            print(link_tag.get_text(strip=True), link_tag.get("href"))

driver.quit()
