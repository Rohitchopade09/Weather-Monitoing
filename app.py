from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data for demonstration purposes
summaries = [
    {'city': 'Delhi', 'date': '2022-01-01', 'dominant_condition': 'Sunny', 'avg_temp': 25.0, 'max_temp': 30.0, 'min_temp': 20.0},
    {'city': 'Delhi', 'date': '2022-01-02', 'dominant_condition': 'Cloudy', 'avg_temp': 22.0, 'max_temp': 28.0, 'min_temp': 18.0},
    {'city': 'Mumbai', 'date': '2022-01-01', 'dominant_condition': 'Rainy', 'avg_temp': 27.0, 'max_temp': 32.0, 'min_temp': 24.0},
    {'city': 'Mumbai', 'date': '2022-01-02', 'dominant_condition': 'Sunny', 'avg_temp': 29.0, 'max_temp': 34.0, 'min_temp': 25.0},
    # Add more data as needed
]

alerts = [
    {'city': 'Delhi', 'alert_type': 'Heatwave', 'alert_message': 'Temperature expected to rise above 35°C', 'timestamp': '2022-01-01 10:00:00'},
    {'city': 'Mumbai', 'alert_type': 'Rain', 'alert_message': 'Heavy rainfall expected', 'timestamp': '2022-01-02 12:00:00'},
    # Add more alerts as needed
]

@app.route('/summaries', methods=['GET'])
def get_summaries():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is required.'}), 400

    summaries_for_city = [summary for summary in summaries if summary['city'].lower() == city.lower()]
    
    if not summaries_for_city:
        return jsonify({'error': 'No summaries found for the specified city.'}), 404

    return jsonify(summaries_for_city)

@app.route('/alerts', methods=['GET'])
def get_alerts():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is required.'}), 400

    alerts_for_city = [alert for alert in alerts if alert['city'].lower() == city.lower()]
    
    if not alerts_for_city:
        return jsonify({'error': 'No alerts found for the specified city.'}), 404

    return jsonify(alerts_for_city)

if __name__ == '__main__':
    app.run(debug=True)