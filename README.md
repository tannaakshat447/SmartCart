# SmartCart – Customer Segmentation using Unsupervised Learning

🔗 **Repo:** [github.com/tannaakshat447/SmartCart](https://github.com/tannaakshat447/SmartCart)
🌐 **Live Demo:** [smart-cart-mu.vercel.app](https://smart-cart-mu.vercel.app/)

SmartCart analyzes customer behavior data and groups customers into meaningful segments using unsupervised machine learning. Instead of predicting an outcome, the goal is to discover natural customer groups from purchasing, demographic, and engagement data — useful for tailoring marketing and business strategy to different customer types.

## Dataset

- 2,240 customer records, 22 original features
- Includes demographics (birth year, education, marital status, income, children), spending across product categories (wine, fruits, meat, fish, sweets, gold), purchase channels (web, catalog, store), campaign responses, and engagement metrics (web visits, recency)

## Workflow

### 1. Data Preprocessing
- Loaded the dataset with Pandas and checked dimensions/missing values
- Filled missing `Income` values with the median

### 2. Feature Engineering
- `Age` derived from `Year_Birth`
- `Customer_Tenure_Days` derived from enrollment date (`Dt_Customer`)
- `Total_Spending` = sum of spending across wine, fruits, meat, fish, sweets, and gold products
- `Total_Children` = kids at home + teens at home
- `Education` simplified into `Undergraduate`, `Graduate`, `Postgraduate`
- `Marital_Status` simplified into `Living_With` (`Alone`, `Partner`)

### 3. Feature Selection / Cleaning
- Dropped identifier columns and the original spending/date/family columns after deriving engineered features
- Removed outliers: age ≥ 90, income ≥ ₹6,00,000 — reduced dataset from 2,240 to 2,236 records

### 4. Encoding & Scaling
- `OneHotEncoder` for categorical features (`Education`, `Living_With`)
- `StandardScaler` to normalize all features before clustering

### 5. Dimensionality Reduction
- PCA with 3 components, capturing ~44.95% of total variance
- Used for both visualization and as input to clustering

### 6. Choosing the Number of Clusters
- Elbow Method (WCSS) via `KneeLocator`
- Silhouette Score across a range of K values
- Both methods pointed to **K = 4**

### 7. Clustering
- Implemented and compared **K-Means** and **Agglomerative Hierarchical Clustering** (Ward linkage)
- Final customer characterization uses the 4 Agglomerative clusters:
  - Cluster 0: 905 customers
  - Cluster 1: 534 customers
  - Cluster 2: 444 customers
  - Cluster 3: 353 customers

### 8. Cluster Analysis
Compared clusters across income, total spending, purchase channels (web/catalog/store), web visits, campaign response, age, number of children, education, and living arrangement to characterize each segment.

## Tech Stack

- Python
- Pandas, NumPy
- Matplotlib, Seaborn
- Scikit-learn (`OneHotEncoder`, `StandardScaler`, `PCA`, `KMeans`, `AgglomerativeClustering`, `silhouette_score`)
- `kneed` (`KneeLocator`) for elbow detection

## Notes

- This is an unsupervised learning project — there are no ground-truth labels, so cluster quality is assessed via the Elbow Method and Silhouette Score rather than accuracy metrics.
- Cluster assignments describe patterns in the data, not predictions of future customer behavior.

## Files

- `smartcart.ipynb` — full analysis notebook
- `smartcart_customers.csv` — customer dataset

## How to Run

```bash
git clone https://github.com/tannaakshat447/SmartCart.git
cd SmartCart
pip install pandas numpy matplotlib seaborn scikit-learn kneed
jupyter notebook smartcart.ipynb
```

## Author

Akshat — B.Tech Data Science & AI, IIIT Ranchi
