export const Button = (props: any) => {
    return (
        <button 
            type="submit" 
            disabled={props.disabled} 
            className='flex items-center justify-center text-center bg-white text-black text-lg font-medium h-8 py-5 px-2 rounded-md'
        >
            {props.isLoading ? 'Loading...' : props.label}
        </button>
    )
}