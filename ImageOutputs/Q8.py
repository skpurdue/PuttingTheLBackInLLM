#Question 8
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# For visualization purposes and to avoid overplotting, let's use a random sample of the data.
sample_data = data_df.sample(n=500, random_state=1)

# Generate a scatterplot
plt.figure(figsize=(10, 6))
plt.savefig('q8l4.png')
plt.scatter(sample_data['salary_in_usd'], sample_data['remote_ratio'], alpha=0.5)
plt.savefig('q8l5.png')
plt.xlabel('Salary in USD')
plt.savefig('q8l6.png')
plt.ylabel('Remote Ratio')
plt.savefig('q8l7.png')
plt.title('Scatterplot of Salary Amounts in USD vs. Remote Ratio')
plt.savefig('q8l8.png')
plt.grid()
plt.savefig('q8l9.png')
plt.savefig('q8l10.png')
plt.show()