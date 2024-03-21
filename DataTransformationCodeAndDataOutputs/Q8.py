#Question 8
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# For visualization purposes and to avoid overplotting, let's use a random sample of the data.
sample_data = data_df.sample(n=500, random_state=1)

sample_data.to_csv('Q8a.csv')
