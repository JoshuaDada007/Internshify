from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PyBlog.settings")
django.setup()
from blogapp.models import Internship

service = Service(executable_path="./chromedriver")
driver = webdriver.Chrome(service=service)

driver.get("https://github.com/SimplifyJobs/Summer2025-Internships")

body_tag = driver.find_elements(By.TAG_NAME, "tbody")
t_row = body_tag[1].find_elements(By.TAG_NAME, "tr")

obj = []
count = 0
for row in t_row:
    if count == 30:
        break
    t_data = row.find_elements(By.TAG_NAME, "td")
    try:
        link = t_data[3].find_element(By.TAG_NAME, "a").get_attribute("href")
    except NoSuchElementException:
        link = "No link available for the website"

    try:
        name = t_data[0].find_element(By.TAG_NAME, "a").text

    except NoSuchElementException:
        name = t_data[0].text

    role = t_data[1].text

    location = t_data[2].text

    intern_obj = {"name": name, "role": role, "location": location, "link": link}

    obj.append(intern_obj)
    if intern_obj["name"] == "↳":
        name = obj[count - 1]["name"]
    Internship.objects.create(name=name, location=location, link=link, role=role)


count += 1

my_internship = Internship.objects.all()
print(my_internship)
# driver.quit()
# print("Selenium quit on me")
