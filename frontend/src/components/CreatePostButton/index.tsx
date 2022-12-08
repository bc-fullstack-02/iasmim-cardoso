import * as Dialog from '@radix-ui/react-dialog';
import Button from '../Button';
function CreatePostButton() {
    return (
        <Dialog.Trigger className='py-3 px-8 mt-6 bg-sky-500 transition-colors hover:bg-cyan-300 rounded-full font-semibold'>
            Novo post
        </Dialog.Trigger>
    )
}

export default CreatePostButton;