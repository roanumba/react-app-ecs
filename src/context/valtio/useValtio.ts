import React, { useEffect } from "react";

export const useValtio = (proxyModel: any) => {

    const [snap, setSnap] = React.useState<any>(proxyModel);
    useEffect(() => {
        const un = (proxyModel as any).subscribe((st: any) => {
            setSnap(st);
            console.log(`st-`, st);

        });

        return () => {
            un();
        };
    }, []);
    return snap;
};
