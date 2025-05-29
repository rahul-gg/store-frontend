import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SNEAKER_SIZE = ['uk6', 'uk7', 'uk8', 'uk9', 'uk10', 'uk11', 'uk12']
const CLOTHING_SIZE = ['s', 'm', 'l']

const SNEAKER_SIZE_OPTIONS = [
    { value: 'uk6', option: 'UK6' },
    { value: 'uk7', option: 'UK7' },
    { value: 'uk8', option: 'UK8' },
    { value: 'uk9', option: 'UK9' },
    { value: 'uk10', option: 'UK10' },
    { value: 'uk11', option: 'UK11' },
    { value: 'uk12', option: 'UK12' }
]

const CLOTHING_SIZE_OPTIONS = [
    { value: 's', option: 'Small' },
    { value: 'm', option: 'Medium' },
    { value: 'l', option: 'Large' }
]

export const CreateListingForm = () => {

    const sneakerSizeList = () => {
        return SNEAKER_SIZE_OPTIONS.map((item: { value: string, option: string }) => (
            <option key={item.value} value={item.value} className='text-black'>{item.option}</option>
        ))
    }

    const clothingSizeList = () => {
        return CLOTHING_SIZE_OPTIONS.map((item: { value: string, option: string }) => (
            <option key={item.value} value={item.value} className='text-black'>{item.option}</option>
        ))
    }

    return (
        <Formik initialValues={{
            sex: '',
            category: '',
            size: '',
            brand: '',
            item_name: '',
            condition: '',
            description: '',
            price: null,
            origin: '',
            address: '',
        }}
            validationSchema={Yup.object({
                sex: Yup.string().required('Required').oneOf(['men', 'women', 'unisex']),
                category: Yup.string().required('Required').oneOf(['sneaker', 'clothing', 'watch']),
                size: Yup.string().when('category', {
                    is: 'sneaker',
                    then: (schema) => schema.required('Required').oneOf(SNEAKER_SIZE),
                    otherwise: (schema) => schema.when('category', {
                        is: 'clothing',
                        then: (schema) => schema.required('Required').oneOf(CLOTHING_SIZE),
                        otherwise: (schema) => schema.notRequired()
                    })
                }),
                brand: Yup.string().when('category', {
                    is: 'sneaker',
                    then: (schema) => schema.required('Required').oneOf(['nike', 'jordan', 'adidas', 'puma', 'converse']),
                    otherwise: (schema) => schema.when('category', {
                        is: 'watch',
                        then: (schema) => schema.required('Required').oneOf(['rolex', 'ap']),
                        otherwise: (schema) => schema.notRequired(),
                    })
                }),
                item_name: Yup.string().required('Required').min(3, 'Too short'),
                condition: Yup.string().required('Required').oneOf(['new', 'gently', 'used', 'worn']),
                description: Yup.string().max(200, 'Too long'),
                price: Yup.number().required('Required').max(1000000),
                origin: Yup.string().oneOf(['usa', 'vietnam', 'china', 'india']),
                address: Yup.string()
            })}
            onSubmit={async (values) => {
                console.log(values)
            }}
        >{(props: any) => (
            <Form className='flex flex-col my-10 w-4/5 gap-16'>
                <div id='details' className='flex flex-col gap-7'>
                    <h1 className='text-2xl font-bold'>Details</h1>

                    <div className='form-row flex gap-5'>
                        <Field as='select' name='sex' placeholder='sex' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer'>
                            <option value="" disabled className=''>Select Gender</option>
                            <option value="male" className='text-black'>Men</option>
                            <option value="women">Women</option>
                            <option value="unisex">Unisex</option>
                        </Field>
                        <Field as='select' name='category' placeholder='category' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer'>
                            <option value="" disabled className=''>Select Category</option>
                            <option value="sneaker">Sneaker</option>
                            <option value="watch">Watch</option>
                            <option value="clothing">Clothing</option>
                        </Field>
                    </div>

                    <div className='form-row flex gap-5'>
                        <Field as='select' name='size' placeholder='size' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer' disabled={!props.values.category || props.values.category === 'watch'}>
                            <option value="" disabled className='text-[#999999]'>Select Size</option>
                            {props.values.category === 'sneaker' ? sneakerSizeList() : clothingSizeList()}
                        </Field>
                        <Field as='select' name='brand' placeholder='brand' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer'>
                            <option value="" disabled className=''>Brand</option>
                            <option value="nike">Nike</option>
                            <option value="adidas">Adidas</option>
                            <option value="jordan">Air Jordan</option>
                        </Field>
                    </div>

                </div>
                <button type='submit' className='flex-1 bg-black text-white rounded-md px-2 py-3 hover:bg-green-500'>Submit</button>
            </Form>)}
        </Formik>
    )
}