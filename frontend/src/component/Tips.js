import {InferenceClient} from "@huggingface/inference"
 export async function Tips(arr){
    const hf = new InferenceClient(process.env.REACT_APP_INTERNSHIPS)
   try{
    const prompt = "Make sure the title of yur response is internship tips with the name of the company in bold.Always introduce yourself like this:  'Hello i'm Toni Dada and i would love to assist you with your internship preparation'  before assisting and make sure you are using markdown format and also make sure you use the name of the company as the title in the request. Focus on providing links that would relate to the job requirement And make sure your texts are small. You've also been given 500 characters maximum, so make sure all the information you give is well within those characters "
    const response = await hf.chatCompletion({
        model:"mistralai/Mixtral-8x7B-Instruct-v0.1",
        max_tokens: 500,
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