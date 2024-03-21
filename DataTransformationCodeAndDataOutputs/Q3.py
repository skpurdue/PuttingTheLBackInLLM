#Question 3
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Group the data by 'employment_type' and calculate the median of 'salary_in_usd'
median_salary_by_emp_type = data_df.groupby('employment_type')['salary_in_usd'].median()

median_salary_by_emp_type.to_csv('Q3a.csv')