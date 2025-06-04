import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import uploadFile from '../../../services/bucket';

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

const ORIGIN_OPTIONS = [
    { value: 'usa', option: 'USA' },
    { value: 'india', option: 'India' },
    { value: 'vietnam', option: 'Vietnam' },
    { value: 'china', option: 'China' },
]

export const CreateListingForm = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
            price: undefined,
            origin: '',
            address: '',
            image: null as unknown as File,
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
                price: Yup.number().required('Required').max(1000000, 'Too large').min(1000, 'Too low'),
                origin: Yup.string().oneOf(['usa', 'vietnam', 'china', 'india']),
                address: Yup.string(),
                image: Yup.mixed()
                    .required('Product image is required')
                    .test('fileSize', 'File size is too large', (value) => {
                        if (!value || !(value instanceof File)) return false;
                        return value.size <= 5000000; // 5MB limit
                    })
                    .test('fileType', 'Unsupported file type', (value) => {
                        if (!value || !(value instanceof File)) return false;
                        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
                    })
            })}
            onSubmit={async (values) => {
                console.log(values)
                await uploadFile(values.image, values.category)
            }}
        >{(props: any) => (
            <Form className='flex flex-col my-10 w-4/5 gap-16'>
                <div id='details' className='flex flex-col gap-7'>
                    <h1 className='text-2xl font-bold'>Details</h1>
                    <div className='form-row flex gap-5'>
                        <div className='flex-1'>
                            <Field as='select' name='sex' placeholder='sex' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer ${props.touched.sex && props.errors.sex && 'border border-red-500'}`}>
                                <option value="" disabled className=''>Select Gender</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="unisex">Unisex</option>
                            </Field>
                            {props.touched.sex && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.sex}</p>}
                        </div>
                        <div className='flex-1'>
                            <Field as='select' name='category' placeholder='category' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer ${props.touched.category && props.errors.category && 'border border-red-500'}`}>
                                <option value="" disabled className=''>Select Category</option>
                                <option value="sneaker">Sneaker</option>
                                <option value="watch">Watch</option>
                                <option value="clothing">Clothing</option>
                            </Field>
                            {props.touched.category && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.category}</p>}
                        </div>
                    </div>

                    <div className='form-row flex gap-5'>
                        <div className='flex-1'>
                            <Field as='select' name='size' placeholder='size' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer ${props.touched.size && props.errors.size && 'border border-red-500'}`} disabled={!props.values.category || props.values.category === 'watch'}>
                                <option value="" disabled className='text-[#999999]'>Select Size</option>
                                {props.values.category === 'sneaker' ? customOptionList(SNEAKER_SIZE_OPTIONS) : customOptionList(CLOTHING_SIZE_OPTIONS)}
                            </Field>
                            {props.touched.size && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.size}</p>}
                        </div>
                        <div className='flex-1'>
                            <Field as='select' name='brand' placeholder='brand' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer ${props.touched.brand && props.errors.brand && 'border border-red-500'}`} disabled={!props.values.category || props.values.category === 'clothing'}>
                                <option value="" disabled className=''>Brand</option>
                                {props.values.category === 'sneaker' ? customOptionList(SNEAKER_BRAND_OPTIONS) : customOptionList(WATCH_BRAND_OPTIONS)}
                            </Field>
                            {props.touched.brand && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.brand}</p>}
                        </div>
                    </div>
                </div>

                <div id='item-details' className='flex flex-col gap-7'>
                    <h1 className='text-2xl font-bold'>Item</h1>
                    <div className='form-row flex gap-5'>
                        <div className='flex-1'>
                            <Field type='text' name='item_name' placeholder='Name' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none ${props.touched.item_name && props.errors.item_name && 'border border-red-500'}`}></Field>
                            {props.touched.item_name && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.item_name}</p>}
                        </div>
                        <div className='flex-1'>
                            <Field as='select' name='condition' placeholder='category' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer ${props.touched.condition && props.errors.condition && 'border border-red-500'}`}>
                                <option value="" disabled className=''>Condition</option>
                                {customOptionList(CONDITION_OPTIONS)}
                            </Field>
                            {props.touched.condition && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.condition}</p>}
                        </div>
                    </div>
                    <div className='form-row flex gap-5'>
                        <div className='flex-1'>
                            <Field type='textarea' name='description' placeholder='Describe the product(optional)' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none ${props.touched.description && props.errors.description && 'border border-red-500'}`}></Field>
                            {props.touched.description && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.description}</p>}
                        </div>
                        <div className='flex-1'>
                            <Field type='number' name='price' placeholder='Price' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none ${props.touched.price && props.errors.price && 'border border-red-500'}`}></Field>
                            {props.touched.price && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.price}</p>}
                        </div>
                    </div>
                    <div className='form-row flex gap-5'>
                        <div className='flex-1'>
                            <Field as='select' name='origin' placeholder='Country of Origin' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none cursor-pointer ${props.touched.origin && props.errors.origin && 'border border-red-500'}`}>
                                <option value="" disabled className=''>Country of Origin</option>
                                {customOptionList(ORIGIN_OPTIONS)}
                            </Field>
                            {props.touched.origin && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.origin}</p>}
                        </div>
                        <div className='flex-1'>
                            <Field type='text' name='address' placeholder='Address' className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none ${props.touched.address && props.errors.address && 'border border-red-500'}`}></Field>
                            {props.touched.address && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.address}</p>}
                        </div>
                    </div>
                    <div className='form-row flex gap-5'>
                        <div className='flex-1'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files?.[0];
                                    props.setFieldValue('image', file);
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setPreviewUrl(url);
                                    }
                                }}
                                className={`w-full bg-[#EEEEEE] p-2 rounded-md outline-none ${props.touched.image && props.errors.image && 'border border-red-500'}`}
                            />
                            {props.touched.image && <p className='text-xs text-red-500 px-2 py-1'>{props.errors.image}</p>}
                        </div>
                    </div>
                    {previewUrl && (
                        <div className='form-row flex gap-5'>
                            <img src={previewUrl} alt="Preview" className='w-full h-fit object-cover' />
                        </div>
                    )}
                </div>
                <button type='submit' className='flex-1 bg-black text-white rounded-md px-2 py-3 hover:bg-green-500'>Submit</button>
            </Form>)}
        </Formik>
    )
}