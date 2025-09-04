"""
YOLOv8-based object detection for cattle & buffalo
"""

import os
import cv2
from ultralytics import YOLO

# Path to your trained YOLO weights
# After training (see notebooks/object_detection.ipynb), replace with best.pt
YOLO_WEIGHTS = os.getenv("ATC_YOLO_WEIGHTS", "models/saved_models/yolo_best.pt")

# Define classes (must match dataset annotations)
CLASS_NAMES = ["cattle", "buffalo"]


class YOLODetector:
    def __init__(self, weights_path: str = YOLO_WEIGHTS, conf: float = 0.25, iou: float = 0.45, device=0):
        """
        Initialize YOLO model
        :param weights_path: path to YOLOv8 weights
        :param conf: confidence threshold
        :param iou: IoU threshold
        :param device: 0 for GPU, 'cpu' for CPU
        """
        self.model = YOLO(weights_path)
        self.conf = conf
        self.iou = iou
        self.device = device

    def detect(self, image_path: str):
        """
        Run detection on image
        Returns list of dicts: [{cls, conf, box}, ...]
        """
        results = self.model.predict(source=image_path, conf=self.conf, iou=self.iou,
                                     device=self.device, verbose=False)
        detections = []
        for r in results:
            if r.boxes is None:
                continue
            for b in r.boxes:
                x1, y1, x2, y2 = b.xyxy[0].tolist()
                conf = float(b.conf[0])
                cls_id = int(b.cls[0])
                label = self.model.names.get(cls_id, str(cls_id))

                # only keep cattle & buffalo classes
                if label in CLASS_NAMES:
                    detections.append({
                        "cls": label,
                        "conf": conf,
                        "box": [x1, y1, x2, y2]
                    })
        return detections

    def crop_best(self, image_path: str, save_path: str = "uploads/crop.jpg"):
        """
        Crops the highest-confidence detection and saves it
        Returns save_path or None if no detection
        """
        detections = self.detect(image_path)
        if not detections:
            return None

        # Select highest confidence
        detections.sort(key=lambda d: d["conf"], reverse=True)
        x1, y1, x2, y2 = map(int, detections[0]["box"])

        img = cv2.imread(image_path)
        if img is None:
            return None

        h, w = img.shape[:2]
        x1 = max(0, min(x1, w - 1))
        y1 = max(0, min(y1, h - 1))
        x2 = max(0, min(x2, w - 1))
        y2 = max(0, min(y2, h - 1))

        crop = img[y1:y2, x1:x2]
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        cv2.imwrite(save_path, crop)
        return save_path
