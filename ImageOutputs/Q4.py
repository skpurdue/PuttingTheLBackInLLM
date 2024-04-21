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

# Generate a bar chart showing the average salary for the top ten most common job titles
plt.figure(figsize=(10, 6))
plt.savefig('q4l8.png')
average_salary_top_jobs.sort_values().plot(kind='barh', color='skyblue')
plt.savefig('q4l9.png')
plt.xlabel('Average Salary (in USD)')
plt.savefig('q4l10.png')
plt.ylabel('Job Title')
plt.savefig('q4l11.png')
plt.title('Average Salary in USD for the Top Ten Most Common Job Titles')
plt.savefig('q4l12.png')
plt.grid(axis='x')
plt.savefig('q4l13.png')
plt.tight_layout()
plt.savefig('q4l14.png')
plt.savefig('q4l15.png')
plt.show()