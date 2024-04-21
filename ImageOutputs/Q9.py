#Question 9
import pandas as pd
file_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGI0Yj402LkIZ9imgjRvfShwpGxU8u0Y8qMJ_MbE3Nj86_3i6yXuXDxHvTqytzhO1kY0H9jhlk9Hn_/pub?output=csv"
data_df = pd.read_csv(file_path)
import matplotlib.pyplot as plt

# For visualization purposes and to avoid overplotting, let's use a random sample of the data.
sample_data = data_df.sample(n=500, random_state=1)

# Let's explore the relationship between years of work and salary_in_usd
# For this also, let's use a random sample of the data to avoid overplotting
# Generate scatterplot
plt.figure(figsize=(10, 6))
plt.savefig('q9l4.png')
plt.scatter(sample_data['work_year'], sample_data['salary_in_usd'], alpha=0.5)
plt.savefig('q9l5.png')
plt.xlabel('Work Year')
plt.savefig('q9l6.png')
plt.ylabel('Salary in USD')
plt.savefig('q9l7.png')
plt.title('Scatterplot of Salary Amounts in USD vs. Work Year')
plt.savefig('q9l8.png')
plt.grid()
plt.savefig('q9l9.png')
plt.savefig('q9l10.png')
plt.show()