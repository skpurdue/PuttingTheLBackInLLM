#Question 3
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Group the data by 'employment_type' and calculate the median of 'salary_in_usd'
median_salary_by_emp_type = data_df.groupby('employment_type')['salary_in_usd'].median()

# Generate a line graph
plt.figure(figsize=(10, 6))
plt.savefig('q3l4.png')
median_salary_by_emp_type.plot(kind='line', marker='o', color='skyblue')
plt.savefig('q3l5.png')
plt.xlabel('Employment Type')
plt.savefig('q3l6.png')
plt.ylabel('Median Salary (in USD)')
plt.savefig('q3l7.png')
plt.title('Median Salary in USD vs Employment Type')
plt.savefig('q3l8.png')
plt.grid(axis='both')
plt.savefig('q3l9.png')
plt.tight_layout()
plt.savefig('q3l10.png')
plt.savefig('q3l11.png')
plt.show()