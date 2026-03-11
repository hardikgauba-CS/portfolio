import os
import time
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Replace with your uploaded file ID
training_file_id = "file-LKymkdQVjywvhXMCuskyrM"

fine_tune_job = client.fine_tuning.jobs.create(
    training_file=training_file_id,
    model="gpt-4o-mini-2024-07-18",  # or another supported model
    suffix="MyChatbot",
    method={
        "type": "supervised",
        "supervised": {
            "hyperparameters": {"n_epochs": 4}
        },
    },
)

job_id = fine_tune_job.id
print("Fine-tune job started:", job_id)

# Poll the job until it completes
while True:
    job_status = client.fine_tuning.jobs.retrieve(job_id)
    print("Job status:", job_status.status)

    if job_status.status in ["succeeded", "failed", "canceled"]:
        break
    time.sleep(15)  # Wait 15 seconds before re-checking

# Once we break out of the loop, we know if it succeeded or failed
if job_status.status == "succeeded":
    fine_tuned_model_name = job_status.fine_tuned_model
    print("Fine-tuning succeeded! Model name:", fine_tuned_model_name)

    # Test the new model
    response = client.chat.completions.create(
        model=fine_tuned_model_name,
        messages=[{"role": "user", "content": "Hello! Tell me about Atishay."}],
        temperature=0.1
    )
    
    print("Response from fine-tuned model:")
    print(response.choices[0].message.content)

else:
    print("Fine-tuning job did not succeed. Status:", job_status.status)
