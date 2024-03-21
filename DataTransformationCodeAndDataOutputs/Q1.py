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

average_salary_by_exp.to_csv('Q1a.csv')