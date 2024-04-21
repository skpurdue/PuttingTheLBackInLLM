#Question 6
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Filter the data to include only Data Scientist job title
data_scientists_data = data_df[data_df['job_title'] == 'Data Scientist']
# Calculate the counts of each salary currency
currency_counts = data_scientists_data['salary_currency'].value_counts()

# Generate a pie chart to visualize the types of salary currencies for Data Scientists
plt.figure(figsize=(10, 6))
plt.savefig('q6l6.png')
currency_counts.plot(kind='pie', autopct='%1.1f%%', startangle=140, pctdistance=0.85, colors=plt.cm.Paired.colors)
plt.savefig('q6l7.png')
plt.title('Salary Currencies for Data Scientists')
plt.savefig('q6l8.png')
plt.ylabel('')
plt.savefig('q6l9.png')
plt.tight_layout()
plt.savefig('q6l10.png')
plt.savefig('q6l11.png')
plt.show()
