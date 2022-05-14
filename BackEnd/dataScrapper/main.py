
import yfinance as yf
from pymongo import MongoClient

def get_bitcoin_candlestick(start_date, end_date):

    """  get bitcoin daily info from yahooFinance and remove non values"""

    btc_df = yf.download("BTC-USD", start_date, end_date,
                         auto_adjust=True)
    btc_df = btc_df.dropna()
    print(btc_df.head())
    return btc_df


def save_to_mongodb(data, database, coin):
    # Making a Connection with MongoClient
    client = MongoClient("mongodb://localhost:27017/")
    # database
    db = client[database]
    # collection
    coin_data = db[coin]
    data.reset_index(inplace=True)
    coin_data.insert_many(data.to_dict('records'))


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    btc_df = get_bitcoin_candlestick("2017-01-01", "2022-05-01")
    save_to_mongodb(btc_df, "crypto_database", "BTC")

