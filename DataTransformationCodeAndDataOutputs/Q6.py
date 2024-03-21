#Question 6
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Filter the data to include only Data Scientist job title
data_scientists_data = data_df[data_df['job_title'] == 'Data Scientist']
# Calculate the counts of each salary currency
currency_counts = data_scientists_data['salary_currency'].value_counts()

data_scientists_data.to_csv('Q6a.csv')
currency_counts.to_csv('Q6b.csv')
