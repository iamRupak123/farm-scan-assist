import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image

# Load pretrained ResNet (replace with your fine-tuned model)
model = models.resnet18(pretrained=True)
model.fc = torch.nn.Linear(model.fc.in_features, 2)  # 0: cattle, 1: buffalo
model.load_state_dict(torch.load("models/saved_models/resnet_cattle_buffalo.pth", map_location="cpu"))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

def predict_animal_type(image_path):
    img = Image.open(image_path).convert("RGB")
    img = transform(img).unsqueeze(0)

    with torch.no_grad():
        outputs = model(img)
        _, predicted = torch.max(outputs, 1)

    return "Cattle" if predicted.item() == 0 else "Buffalo"
