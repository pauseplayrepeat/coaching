"use client";

import { useState, useMemo } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import { categories } from '../navbar/Categories';
import useRentModal from '@/hooks/useRentModal';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: '',
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);
        

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch((error) => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        }
        )
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your service?" subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={() => setCustomValue('category', item.label)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = ( 
        <div className="flex flex-col gap-8"> 
            <Heading 
                title="Where are you located?"
                subtitle="Enter a location"
            />
            <CountrySelect
                value={watch('location')}
                onChange={(value) => setCustomValue('location', value)}
            />
            <Map 
                center={location?.latlng}
            />
        </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basic info about your coaching"
              subtitle="Tell us more about your expertise"
            />
            <Input 
              id="experience"
              label="Years of Experience"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input 
              id="expertise"
              label="Area of Expertise"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input 
        id="sessionLength"
        label="Session Length (in minutes)"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
          </div>
        )
      }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add some photos of yourself and your space"
                    subtitle="Showcase yourself"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )};

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Describe yourself"
                    subtitle="Write a description"
                    />
                    {/* <Input 
                        id="title"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <hr /> */}
                    <Input 
                        id="description"
                        label="Description"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
            </div>
        )};

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Now, set your price"
                    subtitle="How much do you want to charge per session?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )};

    return (
        <Modal
            onClose={rentModal.onClose}
            isOpen={rentModal.isOpen}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Register as a coach"
            body={bodyContent}
        />
    );
};

export default RentModal;
