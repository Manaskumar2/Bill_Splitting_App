export const calculateUserShares = async (totalAmount, splitType, splitDetails) => {
    const userShares = [];
    switch (splitType) {
        case 'equal':
            const numberOfUsers = splitDetails.length;
            const equalShare = totalAmount / numberOfUsers;
            userShares.push(...splitDetails.map(detail => ({
                userId: detail.userId,
                shareAmount: equalShare,
                paid: false,
            })));
            break;
        case 'custom':
            userShares.push(...splitDetails.map(detail => ({
                userId: detail.userId,
                shareAmount: detail.amount,
                paid: false,
            })));
            break;
        case 'percentage':
            userShares.push(...splitDetails.map(detail => ({
                userId: detail.userId,
                shareAmount: (totalAmount * (detail.percentage / 100)),
                paid: false,
            })));
            break;
        default:
            throw new Error('Invalid split type');
    }
    return userShares;
};
