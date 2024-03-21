#Question 4
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Calculate the top 10 most common job titles
top_10_jobs = data_df['job_title'].value_counts().index[:10]
# Filter the data to include only the top 10 most common job titles
filtered_data = data_df[data_df['job_title'].isin(top_10_jobs)]
# Group by job title and calculate the average salary
average_salary_top_jobs = filtered_data.groupby('job_title')['salary_in_usd'].mean()

pd.Series(top_10_jobs).to_csv('Q4a.csv', index = False)
filtered_data.to_csv('Q4b.csv')
average_salary_top_jobs.to_csv('Q4c.csv')