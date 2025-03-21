import { formatCurrency } from '../../src/utils';

type Props={
    label:string,
    amount:number
    coupon?:true
}

const Amount = ({label,amount,coupon}:Props) => {
  return (
    <div className='flex justify-between my-2'>
        
        <dt>
            {label}
        </dt>
        <dd className={`${coupon ? 'text-red-500':'text-black'}`}>
            {formatCurrency(amount)}
        </dd>
    

    </div>
  )
}

export default Amount