import {InferenceClient} from "@huggingface/inference"
 export async function Tips(arr){
    const hf = new InferenceClient(process.env.REACT_APP_INTERNSHIPS)
   try{
    const prompt = "Make sure the title of yur response is internship tips with the name of the company in bold.Always introduce yourself as Joshua Dada and let them know i'm excited to assist the user before assisting and make sure you are using markdown format and also make sure you use the name of the company as the title in the request. And make sure your texts are small"
    const response = await hf.chatCompletion({
        model:"mistralai/Mixtral-8x7B-Instruct-v0.1",
        max_tokens: 300,
        messages:[
            {role: "system", content: prompt},
            {role: "user", content: `Based on these information given by the user which contains name, responsibility, requirements and role - ${arr} - you will give adequate information on how to prepare for the internship based on those criteria. Most importantly in markdown format and use emojis for a more friendly response`}

        ]
        
    })
    return response.choices[0].message.content
   }catch(err){
    console.error(err)
   }
 
    

}