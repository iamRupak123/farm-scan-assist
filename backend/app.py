from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from models.yolo_detector import crop_animal
from models.classifier import predict_animal_type
from processing.feature_extraction import extract_measurements
from database.db_handler import save_result, fetch_result

UPLOAD_FOLDER = "uploads/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app = Flask(__name__)
CORS(app)  # enable React <-> Flask communication
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
# Initialize once
detector = YOLODetector(weights_path="models/saved_models/yolo_best.pt")
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)
        # Detect & crop animal before classification
    cropped_path = crop_animal(filepath)
    if not cropped_path:
        return jsonify({"error": "No cattle/buffalo detected"}), 400        
        # ML classification + feature extraction
        animal_type = predict_animal_type(filepath)
        measurements = extract_measurements(filepath)

        # Save to DB
        result_id = save_result(animal_type, measurements)

        return jsonify({
            "id": result_id,
            "animal": animal_type,
            "measurements": measurements
        })

    return jsonify({"error": "File format not allowed"}), 400

@app.route("/results/<int:result_id>", methods=["GET"])
def get_result(result_id):
    result = fetch_result(result_id)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Result not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
