import sqlite3
from datetime import datetime

DB_NAME = 'workers.db'

def create_connection():
    return sqlite3.connect(DB_NAME)

def create_table(conn):
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS access_logs (
            worker_id TEXT,
            timestamp TEXT
        )
    ''')
    conn.commit()

def insert_sample_records(conn):
    cursor = conn.cursor()
    sample_data = [
        ('Worker1', str(datetime.now())),
        ('Worker2', str(datetime.now())),
        ('Worker3', str(datetime.now())),
        ('Worker4', str(datetime.now())),
        ('Worker5', str(datetime.now()))
    ]
    cursor.executemany('INSERT INTO access_logs (worker_id, timestamp) VALUES (?, ?)', sample_data)
    conn.commit()

def fetch_all_workers(conn):
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM access_logs')
    rows = cursor.fetchall()
    for row in rows:
        print(row)

def clear_database(conn):
    cursor = conn.cursor()
    cursor.execute('DELETE FROM access_logs')
    conn.commit()
    print("Database cleared successfully!")

if __name__ == "__main__":
    connection = create_connection()
    if connection:
        clear_database(connection)
        create_table(connection)
        insert_sample_records(connection)
        fetch_all_workers(connection)  # Retrieve and print all workers
        connection.close()
