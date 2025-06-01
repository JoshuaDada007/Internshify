# 🛠️ Internshify – Django REST API Backend with JWT & Selenium Integration

Internshify is a backend project built using **Django** and **Django REST Framework (DRF)**. It features **JWT authentication** and **Selenium-powered web scraping** to populate internship listings from online sources. It also provides an authenticated blogging system where users can post about their internship experiences.

---

## 📌 Features

- 🔐 JWT-based user authentication (`djangorestframework-simplejwt`)
- 📦 Modular Django models and DRF serializers for blogs and internships
- 🤖 Selenium integration to scrape live internship listings into the database
- 💬 Authenticated blog posting system for users
- 💾 Uses SQLite by default, but supports MySQL/PostgreSQL
- 🔐 API endpoints secured with JWT for authorized users
- 🧪 Simple test suite using Django’s test framework

---

## 🚀 Technologies Used

- Python 3.8+
- Django 4.x
- Django REST Framework
- SimpleJWT
- Selenium + ChromeDriver
- SQLite (default DB)
- Git & GitHub

---






## 🗄️ Database Setup

Run the following commands:

```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## ▶️ Running the Server

Start the development server:

```bash
python manage.py runserver
```

Visit: `http://127.0.0.1:8000/`

---

## 🔐 JWT Authentication Endpoints

- `POST token/` — Obtain access and refresh tokens
- `POST token/refresh/` — Refresh access token

Add this header when making authenticated requests:

```
Authorization: Bearer <access_token>
```

---

## 📡 API Endpoints

### Blog Endpoints

```
POST    blogapp/register
GET     blogapp/get_blogs      # List all blog posts
POST    blogapp/new_blog      # Create a new blog post
PUT     blogapp/update_blog/<id>  # Update a blog post
DELETE  blogapp/delete_blog/<id> # Delete a blog post
```

### Internship Listing Endpoints

```
GET     blogapp/internships      # List all scraped internships
```

---

## 🤖 Selenium Integration

A script (`internship_scrape.py`) uses Selenium to scrape internships and save them via Django models.

Example usage:

```python
import os
import django
from selenium import webdriver
from selenium.webdriver.common.by import By

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "internshify.settings")
django.setup()

from api.models import Internship

driver = webdriver.Chrome()
driver.get("https://example.com/internships")

titles = driver.find_elements(By.XPATH, "//h2[@class='title']")
companies = driver.find_elements(By.XPATH, "//div[@class='company']")

for t, c in zip(titles, companies):
    Internship.objects.create(title=t.text, company=c.text)

driver.quit()
```

Run it with:

```bash
python scrape_internships.py
```

---

## 🧪 Running Tests

```bash
python manage.py test
```

---

## 🗂️ .gitignore Example

```
*.pyc
__pycache__/
db.sqlite3
.env
/static/
/media/
/venv/
/node_modules/
```

---


## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 📬 Contact

**Author:** Joshua Dada
---
**Email:** joshuadadabiz@gmail.com 
---
**GitHub:** [@joshuadada007](https://github.com/joshuadada007)  
---
---