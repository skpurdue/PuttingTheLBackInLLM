#Question 1
import pandas as pd
# Load the data from the file
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
# Display the first few rows of the DataFrame
data_df.head()
import matplotlib.pyplot as plt
# Group the data by 'experience_level' and calculate the mean of 'salary_in_usd'
average_salary_by_exp = data_df.groupby('experience_level')['salary_in_usd'].mean()

# Generate a bar chart
plt.figure(figsize=(10, 6))
plt.savefig('q1l11.png')
average_salary_by_exp.plot(kind='bar', color='skyblue')
plt.savefig('q1l12.png')
plt.xlabel('Experience Level')
plt.savefig('q1l13.png')
plt.ylabel('Average Salary (in USD)')
plt.savefig('q1l14.png')
plt.title('Average Salary in USD vs Experience Level')
plt.savefig('q1l15.png')
plt.xticks(rotation=45)
plt.savefig('q1l16.png')
plt.grid(axis='y')
plt.savefig('q1l17.png')
plt.tight_layout()
plt.savefig('q1l18.png')
plt.savefig('q1l19.png')
plt.show()
