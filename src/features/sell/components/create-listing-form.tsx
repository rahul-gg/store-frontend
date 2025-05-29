import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SNEAKER_SIZE = ['uk6', 'uk7', 'uk8', 'uk9', 'uk10', 'uk11', 'uk12']
const CLOTHING_SIZE = ['s', 'm', 'l']

//create another file to keep constants for options and sizes -- TODO
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

const SNEAKER_BRAND_OPTIONS = [
    { value: 'nike', option: 'Nike' },
    { value: 'adidas', option: 'Adidas' },
    { value: 'jordan', option: 'Air Jordan' },
    { value: 'puma', option: 'Puma' },
    { value: 'converse', option: 'Converse' }
]

const WATCH_BRAND_OPTIONS = [
    { value: 'rolex', option: 'Rolex' },
    { value: 'ap', option: 'Audemars Piguet' },
]

const CONDITION_OPTIONS = [
    { value: 'new', option: 'New' },
    { value: 'gently', option: 'Gently Used' },
    { value: 'used', option: 'Used' },
    { value: 'worn', option: 'Worn' },
]

export const CreateListingForm = () => {

    const customOptionList = (optionList: { value: string, option: string }[]) => {
        return optionList.map((item: { value: string, option: string }) => (
            <option key={item.value} value={item.value}>{item.option}</option>
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
                            {props.values.category === 'sneaker' ? customOptionList(SNEAKER_SIZE_OPTIONS) : customOptionList(CLOTHING_SIZE_OPTIONS)}
                        </Field>
                        <Field as='select' name='brand' placeholder='brand' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer' disabled={!props.values.category || props.values.category === 'clothing'}>
                            <option value="" disabled className=''>Brand</option>
                            {props.values.category === 'sneaker' ? customOptionList(SNEAKER_BRAND_OPTIONS) : customOptionList(WATCH_BRAND_OPTIONS)}
                        </Field>
                    </div>
                </div>

                <div id='item-details' className='flex flex-col gap-7'>
                    <h1 className='text-2xl font-bold'>Item</h1>
                    <div className='form-row flex gap-5'>
                        <Field type='text' name='item_name' placeholder='Name' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none'></Field>
                        <Field as='select' name='condition' placeholder='category' className='flex-1 bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer'>
                            <option value="" disabled className=''>Condition</option>
                            {customOptionList(CONDITION_OPTIONS)}
                        </Field>
                    </div>
                </div>
                <button type='submit' className='flex-1 bg-black text-white rounded-md px-2 py-3 hover:bg-green-500'>Submit</button>
            </Form>)}
        </Formik>
    )
}