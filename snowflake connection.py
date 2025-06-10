import os
import requests
import snowflake.connector
from snowflake.connector.pandas_tools import write_pandas
import pandas as pd
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def get_snowflake_connection():
    """Establish secure connection using OAuth token"""
    try:
        return snowflake.connector.connect(
            account=os.getenv('SNOWFLAKE_ACCOUNT'),
            user=os.getenv('SNOWFLAKE_USER'),
            token=os.getenv('SNOWFLAKE_OAUTH_TOKEN'),  # Short-lived token
            warehouse=os.getenv('SNOWFLAKE_WAREHOUSE'),
            database=os.getenv('SNOWFLAKE_DATABASE'),
            schema=os.getenv('SNOWFLAKE_SCHEMA'),
            client_session_keep_alive=True
        )
    except Exception as e:
        logger.error(f"Connection failed: {e}")
        raise

def fetch_coins_data():
    """Secure CoinGecko API request with API key"""
    url = "https://api.coingecko.com/api/v3/coins/list"
    params = {
        'include_platform': 'true'  # Example parameter
    }
    headers = {
        'Accepts': 'application/json',
        'X-CoinGecko-API-Key': os.getenv('COINGECKO_API_KEY')  # From .env
    }
    
    try:
        response = requests.get(
            url,
            headers=headers,
            params=params,
            timeout=15
        )
        
        # Check for API errors
        if response.status_code == 429:
            logger.warning("Rate limit hit - implement backoff")
            raise Exception("Rate limit exceeded")
            
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        logger.error(f"API request failed: {e.response.text if hasattr(e, 'response') else str(e)}")
        raise
def load_to_snowflake(data):
    """Load data into Snowflake with error handling"""
    conn = None
    try:
        df = pd.DataFrame(data)
        conn = get_snowflake_connection()
        
        write_pandas(
            conn,
            df,
            table_name='COINS_LIST',
            schema=os.getenv('SNOWFLAKE_SCHEMA'),
            auto_create_table=True,
            overwrite=False
        )
        logger.info(f"Successfully loaded {len(df)} records")
        
    except Exception as e:
        logger.error(f"Load failed: {e}")
        raise
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    coins_data = fetch_coins_data()
    load_to_snowflake(coins_data)