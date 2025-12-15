export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { telegram_id, username, ref } = req.body;

    console.log("AUTH:", telegram_id, username, ref);

    let referrerId = null;

    if (ref && ref.startsWith("ref_")) {
        const id = Number(ref.replace("ref_", ""));
        if (id && id !== telegram_id) {
            referrerId = id;
        }
    }

    if (referrerId) {
        console.log(`REFERRAL: ${telegram_id} -> ${referrerId}`);
    }

    res.json({
        ok: true,
        referrer: referrerId
    });
}
