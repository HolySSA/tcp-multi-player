using System;
using UnityEngine;

public class Handler : MonoBehaviour
{
    public static void InitialHandler(InitialResponse res)
    {
        try
        {
            GameManager.instance.GameStart();
            // �����κ��� ���� x, y ��ǥ�� ��ġ ������Ʈ
            GameManager.instance.player.UpdatePositionFromServer(res.x, res.y);

            // Debug.Log($"Initial position from server - x: {res.x}, y: {res.y}");
        } catch(Exception e)
        {
            Debug.LogError($"Error InitialHandler: {e.Message}");
        }
    }
}
