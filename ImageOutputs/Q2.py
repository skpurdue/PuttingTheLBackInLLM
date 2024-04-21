#Question 2
import pandas as pd
# Load the data from the file
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
# Display the first few rows of the DataFrame
data_df.head()
import matplotlib.pyplot as plt
# Group the data by 'experience_level' and calculate the mean of 'salary_in_usd'
average_salary_by_exp = data_df.groupby('experience_level')['salary_in_usd'].mean()

# Generate a line graph
plt.figure(figsize=(10, 6))
plt.savefig('q2l2.png')
average_salary_by_exp.plot(kind='line', marker='o', color='skyblue')
plt.savefig('q2l3.png')
plt.xlabel('Experience Level')
plt.savefig('q2l4.png')
plt.ylabel('Average Salary (in USD)')
plt.savefig('q2l5.png')
plt.title('Average Salary in USD vs Experience Level')
plt.savefig('q2l6.png')
plt.grid(axis='both')
plt.savefig('q2l7.png')
plt.tight_layout()
plt.savefig('q2l8.png')
plt.savefig('q2l9.png')
plt.show()
