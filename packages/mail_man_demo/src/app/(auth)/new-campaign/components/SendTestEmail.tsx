import React from 'react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SendTestEmail = () => {
  return (
    <Card className="border-none p-5 space-y-5">
      <p>Send Test Email</p>

      <div className='w-full flex justify-end'>
        <Button>Send</Button>
      </div>
    </Card>
  );
}

export default SendTestEmail