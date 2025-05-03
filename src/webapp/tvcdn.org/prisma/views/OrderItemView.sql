CREATE view OrderItemView as
SELECT item.id,
    item."orderId",
    item."productId",
    item.quantity,
    item."unitDiscount",
    item."unitPrice",
    (
        SELECT p.name
        FROM "Product" p
        WHERE p.id = item."productId"
    ) AS name,
    (
        SELECT top 1 pi.url
        FROM "ProductImages" pi
        WHERE pi."productId" = item."productId"
    ) AS url,
    item."variants",
    item."variantCosts"
FROM "OrderItem" item;
