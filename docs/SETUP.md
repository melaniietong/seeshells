# Set Up

## Prerequisites
- You'll need a dataset of seashell images. I used this one: https://doi.org/10.6084/m9.figshare.9122621.v1.
- Some knowledge of GCP, especially Vertex AI.

## Notes
- Keep in mind that Vertex AI requires at least 10 quality images per label.
- When using GCP, keep in mind costs and plan your project accordingly.

## Steps

### Model Training Guide

1. Create a new project in GCP.
2. Prepare your dataset by organizing images into folders by species name.
3. In GC Storage, create a new bucket for your dataset and upload your folders + images to it.

```
Sample expected outcome:

gs://seashell-data/
    ├── conch/
    │   ├── conch_001.jpg
    │   ├── conch_002.jpg
    ├── scallop/
        ├── scallop_001.jpg
        ├── scallop_002.jpg
```

4. Create a CSV manifest mapping each image to its label, and upload it to the same bucket.

```
Sample expected outcome:

gs://seashell-dataset/conch/conch_001.jpg,conch
gs://seashell-dataset/scallop/scallop_001.jpg,scallop
```

5. In Vertex AI, create a new dataset:
    - Data type: Image
    - Objective: Single-label classification
6. Import your dataset by selecting “Import files from Cloud Storage” and choosing your manifest CSV.
7. Once the files are imported, select "Train new model":
    - Model training method: AutoML
    - Choose where to use the model: Cloud
8. Once the training finishes, click on the model. You can review the precision of the model under the "Evaluate" tab.
9. Under the "Deploy and test" tab, deploy the model.

### App Guide

Versions:

```
Node: v24.9.0
NPM: 11.6.0
```

1. Clone the repository.
2. Create an env file at the root of the project:

```shell
cat <<EOF > .env
GOOGLE_APPLICATION_CREDENTIALS=your-creds-file
GCLOUD_PROJECT_ID=your-project-id
VERTEX_ENDPOINT_ID=your-endpoint-id
EOF
```

3. Run the project:

```shell
npm i
npm run dev
```

The app will start running on http://localhost:9000. (You can change the port number in `index.ts`)