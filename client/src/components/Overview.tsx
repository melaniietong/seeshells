import '../styles/styles.scss'
import type { ApiResponse } from '../../../shared/types/api';
import PercentageBar from './PercentageBar';
import arrowIcon from '../assets/arrow.svg';
import lowConfidenceImage from '../assets/low-confidence.svg';
import getWikipediaImageUrl from '../utils/image';
import { useEffect, useState } from 'react';

interface OverviewProps {
    result: ApiResponse;
}

const Overview: React.FC<OverviewProps> = ({ result }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLowConfidence, setIsLowConfidence] = useState<boolean>(false);

    const secondaryResultsDisplay = isLowConfidence ? result.data : result.data.slice(1);

    useEffect(() => {
        const fetchImage = async () => {
            const top = result.data[0];
            const hasHighConfidence = Boolean(
                top &&
                top.score &&
                (top.score * 100) > 50
            );

            setIsLowConfidence(!hasHighConfidence);

            if (hasHighConfidence && top.description && top.description !== '') {
                const url = await getWikipediaImageUrl(top.description);
                setImageUrl(url ?? lowConfidenceImage);
            } else {
                setImageUrl(lowConfidenceImage);
            }
        };

        fetchImage();
    }, [result]);

    return (
        <div className='w-100 background-gradient border-radius-25 p-32 res-height-500'>
            <div className='h-100 d-flex gap-24 background-white border-radius-25 p-24'>
                {imageUrl != '' && (
                    <img
                        src={`${imageUrl}`}
                        className={`w-50 ${isLowConfidence ? 'background-light-grey p-32' : ''}`} />
                )}
                <div className='w-50 d-flex flex-col gap-42'>
                    <div className='d-flex flex-col gap-12'>
                        <div className='text-regular m-b-4'>{isLowConfidence ? 'Unclear prediction' : 'Top prediction'}</div>
                        <div className='text-regular-large'>{isLowConfidence ? 'Try uploading a clearer image with a contrasting background' : result.data[0].description}</div>

                        {!isLowConfidence && (
                            <>
                                <a
                                    className='d-flex gap-4'
                                    href={`https://en.wikipedia.org/wiki/${result.data[0].description}`}
                                    target='_blank'>
                                    <img
                                        src={arrowIcon}
                                        alt='Link'
                                        className='w-12px' />
                                    <div className='text-regular-small'>Wikipedia article</div>
                                </a>
                                <PercentageBar percentage={Number(result.data[0].score)} />
                            </>
                        )}
                    </div>

                    <div className='d-flex flex-col gap-12'>
                        <div className='text-regular m-b-4'>{isLowConfidence ? 'Predictions' : 'Other predictions'}</div>

                        {secondaryResultsDisplay.map((pred, i) => (
                            <div
                                key={i}
                                className="d-flex flex-col gap-8">
                                <div className='d-flex gap-4'>
                                    <a
                                        className='d-flex gap-4'
                                        href={`https://en.wikipedia.org/wiki/${pred.description}`}
                                        target='_blank'>
                                        <div className='text-regular-small-bold'>{pred.description}</div>
                                        <img
                                            src={arrowIcon}
                                            alt='Link'
                                            className='w-12px' />
                                    </a>
                                </div>
                                <PercentageBar percentage={Number(pred.score)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
