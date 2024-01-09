import sqlite3
from datetime import datetime

DB_NAME = 'workers.db'

def create_connection():
    return sqlite3.connect(DB_NAME)

def create_table(conn):
    cursor = conn.cursor()
    #cursor.execute(f'DROP TABLE IF EXISTS access_logs')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS access_logs (
            worker_id INTEGER,
            worker_name TEXT,
            timestamp TEXT,
            status TEXT  -- Adding status column to track entry/exit
        )
    ''')
    conn.commit()

def insert_sample_records(conn):
    cursor = conn.cursor()
    sample_data = [
        (1, 'Worker1', str(datetime.now()), 'ENTER'),
        (2, 'Worker2', str(datetime.now()), 'ENTER'),
        (3, 'Worker3', str(datetime.now()), 'ENTER'),
        (4, 'Worker4', str(datetime.now()), 'ENTER'),
        (5, 'Worker5', str(datetime.now()), 'ENTER'),
        (1, 'Worker1', str(datetime.now()), 'LEAVE'),
        (2, 'Worker2', str(datetime.now()), 'LEAVE'),
        (3, 'Worker3', str(datetime.now()), 'LEAVE'),
        (4, 'Worker4', str(datetime.now()), 'LEAVE'),
        (5, 'Worker5', str(datetime.now()), 'LEAVE')
    ]
    cursor.executemany('INSERT INTO access_logs (worker_id, worker_name, timestamp, status) VALUES (?, ?, ?, ?)', sample_data)
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
