using System;
using UnityEngine;

public class Handler : MonoBehaviour
{
    public static void InitialHandler(InitialResponse res)
    {
        try
        {
            GameManager.instance.GameStart();
            // 서버로부터 받은 x, y 좌표로 위치 업데이트
            GameManager.instance.player.UpdatePositionFromServer(res.x, res.y);

            // Debug.Log($"Initial position from server - x: {res.x}, y: {res.y}");
        } catch(Exception e)
        {
            Debug.LogError($"Error InitialHandler: {e.Message}");
        }
    }
}
