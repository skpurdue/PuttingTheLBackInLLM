#Question 5
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# Count the number of each job title for each experience level
job_title_by_exp = data_df.groupby('experience_level')['job_title'].value_counts().unstack()

job_title_by_exp.to_csv('Q5a.csv')