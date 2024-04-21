#Question 5
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Count the number of each job title for each experience level
job_title_by_exp = data_df.groupby('experience_level')['job_title'].value_counts().unstack()

# Generate a stacked bar chart
job_title_by_exp.plot(kind='bar', stacked=True, figsize=(12, 8))
plt.savefig('q5l4.png')
plt.xlabel('Experience Level')
plt.savefig('q5l5.png')
plt.ylabel('Number of Employees')
plt.savefig('q5l6.png')
plt.title('Distribution of Job Titles by Experience Level')
plt.savefig('q5l7.png')
plt.xticks(rotation=45)
plt.savefig('q5l8.png')
plt.legend(title='Job Title', bbox_to_anchor=(1.05, 1), loc='upper left')
plt.savefig('q5l9.png')
plt.tight_layout()
plt.savefig('q5l10.png')
plt.savefig('q5l11.png')
plt.show()