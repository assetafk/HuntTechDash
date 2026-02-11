import { useMe } from '@/features/auth/hooks/useMe'
import { Button } from '@/shared/api/ui/Button';


export const DashboardPage = () => {
    const { data, isLoading } = useMe();

    if (isLoading) {
        return <div>Loading...</div>
    }
    
    return (
        <div className="p-8">
           <h1 className="text-2x1 font bold mb-4"> Welcome {data?.name}</h1>
           <Button
           label="Click me"
           size="lg"
           color="bg-green-500"
           onClick={() => alert("button clicked!")} 
           />

        </div>
    );
};