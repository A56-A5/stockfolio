from flask import Flask, render_template, request, jsonify
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from datetime import datetime

app = Flask(__name__)

def create_plot(df, plot_type='basic'):
    plt.figure(figsize=(12, 6))
    
    if plot_type == 'basic':
        plt.plot(df.Close, 'b', label='Original Price')
    elif plot_type == 'ma100':
        ma100 = df.Close.rolling(100).mean()
        plt.plot(ma100, 'r', label='MA100')
        plt.plot(df.Close, 'b', label='Original Price')
    elif plot_type == 'both_ma':
        ma100 = df.Close.rolling(100).mean()
        ma200 = df.Close.rolling(200).mean()
        plt.plot(ma100, 'r', label='MA100')
        plt.plot(ma200, 'g', label='MA200')
        plt.plot(df.Close, 'b', label='Original Price')
    
    plt.legend()
    plt.xlabel('Date')
    plt.ylabel('Price')
    
    # Save plot to a temporary buffer.
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    plt.close()
    buf.seek(0)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    ticker = request.form.get('ticker')
    if not ticker:
        return jsonify({'error': 'Please enter a ticker symbol'})
    
    try:
        start = '2010-01-01'
        end = datetime.now().strftime('%Y-%m-%d')
        
        # Get data from yfinance
        df = yf.download(ticker, start=start, end=end)
        
        if df.empty:
            return jsonify({'error': 'No data found for ticker symbol'})
        
        # Generate statistics
        stats = df.describe().to_html(classes='table table-striped')
        
        # Generate plots
        basic_plot = create_plot(df, 'basic')
        ma100_plot = create_plot(df, 'ma100')
        both_ma_plot = create_plot(df, 'both_ma')
        
        return jsonify({
            'success': True,
            'stats': stats,
            'basic_plot': basic_plot,
            'ma100_plot': ma100_plot,
            'both_ma_plot': both_ma_plot
        })
        
    except Exception as e:
        return jsonify({'error': f'Error fetching data: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)