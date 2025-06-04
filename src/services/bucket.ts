import { supabase } from "../supabase"

//TODO: format the response to return file path stored on the bucket
//error handling, type definiftions

const uploadFile = async (file: File, category: string) => {
    try {
        const response = await supabase.storage.from(`images/${category}`).upload(file.name, file)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export default uploadFile