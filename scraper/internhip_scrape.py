import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PyBlog.settings")
django.setup()
from blogapp.models import Internship

service = Service(executable_path="./chromedriver")

driver = webdriver.Chrome(service=service)
obj = []
category = []
skills = []
requirement = []
responsibility = []
season = ""
name = ""
role = ""
link = ""
location = ""
date_posted = ""
count = 0

# Internship.objects.all().delete()

driver.get("https://github.com/SimplifyJobs/Summer2025-Internships")

body_tag = driver.find_elements(By.TAG_NAME, "tbody")
wait = WebDriverWait(driver, 10)
# t_row = wait.until(EC.presence_of_all_elements_located())
t_row = body_tag[1].find_elements(By.TAG_NAME, "tr")
print(f"This is the length: {len(t_row)}")

for row in range(len(t_row)):
    print("T_DATA has been QUERIED")
    t_data = t_row[row].find_elements(By.TAG_NAME, "td")
    print("T_DATA has been bypassed")

    try:
        name = t_data[0].find_element(By.TAG_NAME, "a").text

    except NoSuchElementException:
        name = t_data[0].text

    role = t_data[1].text
    location = t_data[2].text

    date_posted = t_data[4].text
    try:
        link = t_data[3].find_element(By.TAG_NAME, "a").get_attribute("href")
    except NoSuchElementException:
        link = ""

    # print(f"{row}: name - {name} - role - {role} - location - {location} - link - {link} ")
#
    secondLink = t_data[3].find_elements(By.TAG_NAME, "a")
    try:
        if len(secondLink) > 0:
            secondLinkClick = secondLink[1]
            secondLinkClick.click()
        else:
            raise IndexError("No lik to click")

        # Scrape season
        try:
            p = driver.find_element(By.CSS_SELECTOR,
                                    ".rounded-full.bg-primary-50.px-3.py-1\\.5.text-sm.text-primary-500")
            season = p.text
        except NoSuchElementException:
            pass

            # Scrape category and skills
        category = []
        skills = []
        try:
            category_div = driver.find_elements(By.CSS_SELECTOR,
                                                ".mb-1.ml-6.flex.flex-wrap.justify-start.gap-3.text-sm")
            category_element = category_div[0].find_elements(By.TAG_NAME, "div")
            for i in category_element:
                category.append(i.text)
            skills_element = category_div[1].find_elements(By.TAG_NAME, "div")
            for i in skills_element:
                skills.append(i.text)
        except Exception:
            pass

        # Scrape requirement and responsibility
        requirement = []
        responsibility = []
        try:
            requirement_element = driver.find_elements(By.CSS_SELECTOR, ".ml-5.list-disc")
            requirement_list = requirement_element[0].find_elements(By.TAG_NAME, "li")
            for i in requirement_list:
                requirement.append(i.text)
            responsibility_list = requirement_element[1].find_elements(By.TAG_NAME, "li")
            for i in responsibility_list:
                responsibility.append(i.text)
        except Exception:
            pass

        # Return to main page
        back_button = driver.find_element(By.CSS_SELECTOR,
                                          ".flex.items-center.gap-2.py-2.text-xs.text-gray-500.sm\\:text-sm")
        back_button.click()

        # Create internship object
        intern_obj = {
            "name": name,
            "role": role,
            "location": location,
            "link": link,
            "season": season,
            "category": category,
            "skills": skills,
            "requirement": requirement,
            "responsibility": responsibility
        }

        if intern_obj["name"] == "↳":
            name = obj[len(obj) - 1]
            intern_obj["name"] = name
        else:
            obj.append(name)

        print(f"{count}{intern_obj}")
        Internship.objects.create(name=name, role=role, location=location, link=link, season=season,
                                  requirement=requirement,
                                  responsibility=responsibility, skill=skills, category=category,
                                  date_posted=date_posted)
        count += 1

    except (NoSuchElementException, IndexError) as e:
        intern_obj = {
            "name": name,
            "role": role,
            "location": location,
            "link": link
        }

        if intern_obj["name"] == "↳":
            name = obj[len(obj) - 1]
            intern_obj["name"] = name
        else:
            obj.append(name)
        # print(f"This is the name - {obj}")
        print(f" -Error-{count}{intern_obj}")
        Internship.objects.create(name=name, role=role, location=location, link=link, date_posted=date_posted)
        continue
